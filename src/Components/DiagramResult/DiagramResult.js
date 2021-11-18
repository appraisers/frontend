import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
    VictoryBar, VictoryChart, VictoryLabel,
    VictoryTheme, VictoryPolarAxis, VictoryStack
} from 'victory';
import _ from 'lodash';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, Modal, Backdrop }  from '@material-ui/core';
import DescriptionFaculty from "../DescriptionFaculty/Faculty.js";
import './DiagramResult.css';

const directions = {
    0: "Математическое моделирование", 
    30: "Прикладная математика", 
    60: "Высокопроизводительные системы", 
    90: "Умные системы",
    120: "Автоматизированные системы",
    150: "Информационные системы", 
    180: "Бизнес-процессы", 
    210: "IT-managment", 
    240: "Машинное обучение", 
    270: "Эргодизайн", 
    300: "Разработка ПО", 
    330: "Киберфизические системы"
};

const mainColor = {base: "#0090ff", highlight: "#215BFD"};

const centerColor = {base: "#0090ff", highlight: "white"};

const innerRadius = 7;

function CompassCenter({ origin }) {
    const circleStyle = {
        stroke: centerColor.base, strokeWidth: 2, fill: centerColor.highlight
    };

    return (
        <g>
            <circle
                cx={origin.x} cy={origin.y} r={innerRadius} style={circleStyle}
            />
        </g>
    );
}

function CenterLabel(props) {
    const {datum, active, color} = props;
    const text = [`${directions[datum._x] || ' '}`];
    const baseStyle = { fill: color.highlight };
    const style = [
        {...baseStyle, fontSize: 4},
        {...baseStyle, fontSize: 4}
    ];

    return active ?
        (
            <VictoryLabel
                text={text} style={style} x={props.width / 2 -5} y={props.height / 2 -1} renderInPortal
            />
        ) : null;
}

const TableResult = ({ rows, handleOpen }) => {

    return (
        <TableContainer component={Paper} style={{ maxWidth: 600, marginBottom: 20 }}>
            <Table size="small" style={{ maxWidth: 600 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Название направления
                        </TableCell>
                        <TableCell align="center">
                            Заинтересованность
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, i) => (
                        <TableRow key={`row-${i}`}>
                            <TableCell onClick={() => handleOpen(i + 1)} className="table-cell">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">
                                {row.score}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}


const DiagramRes = ({ scores }) => {
    const data = scores.map((value, index) => ({
        x: index * 30,
        y: value.score
    }));

    const rows = scores.map((value, index) => ({
        name: directions[index * 30],
        score: `${_.round(value.score, 1)} / 7`
    }));

    const [open, setOpen] = useState(false);
    const [oneKafedr, setOneKafedr] = useState({});

    const getOneKafedr = async() => {
        if (open) {
            const res = await axios.post(
                `${process.env.REACT_APP_SERVER_ENDPOINT}/departments`, {
                    id: open
                }
              );
            if (res.data.statusCode === '200') {
                setOneKafedr(res.data.data);
            }
        }
        return {};
    };

    useEffect(() => {
        getOneKafedr();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    const handleOpen = (id) => {
        setOpen(id);
      };
    
    const handleClose = () => {
        setOpen(false);
        setOneKafedr({});
    };
    
    return (
        <>
            <VictoryChart
                height={200}
                width={400}
                polar
                theme={VictoryTheme.material}
                innerRadius={innerRadius}
                domainPadding={{y: 5}}
            >
                {/* внутренние круговые */}
                <VictoryPolarAxis
                    dependentAxis
                    labelPlacement="vertical"
                    style={{axis: {stroke: "none"}}}
                    tickFormat={() => ""}
                />
                {/* подписи справа */}
                <VictoryPolarAxis
                    labelPlacement="parallel"
                    tickValues={_.keys(directions).map((k) => +k)}
                    tickFormat={_.values(directions)}
                    style={{
                        tickLabels: {fontSize: 4, padding: 8},
                        axis: {stroke: "#2A8FF0"}
                    }}
                />
                {data.length &&
                    <VictoryStack>
                        <VictoryBar
                            style={{
                                data: {
                                    fill: ({active}) => active ? mainColor.highlight : mainColor.base,
                                    width: 10
                                }
                            }}
                            data={data}
                            x="x"
                            y="y"
                            labelComponent={<CenterLabel color={mainColor}/>}
                        />
                    </VictoryStack>
                }
                <CompassCenter />
            </VictoryChart>
            <TableResult rows={rows} handleOpen={handleOpen} />
            <Modal
                open={!!open}
                className="modal-window"
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <div className="window-main">
                    <DescriptionFaculty data={oneKafedr} />
                </div>
            </Modal>
        </>
    );
}


export default DiagramRes;
