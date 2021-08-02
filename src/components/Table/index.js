import React, { useState, useEffect } from "react";
import { StickyTable, Row, Cell } from "react-sticky-table";
import utils from "../../utils";
import numeral from "numeral";
import moment from "moment";
import ExportButton from "../ExportButton";

import "./style.css";

const Table = (props) => {
  const tractInfo = props.tractInfo;
  const headerArray = ["indicator"];
  const [data, setData] = useState([]);
  const [header, setHeader] = useState([]);
  const indicatorInfo = props.indicators;
  // const indicatorFormatter = indicator => indicator.type === 'Percent'
  //     ? '0.0%'
  //     : indicator.type === 'Ratio'
  //       ? '0.0'
  //       : '0,0';

  const selectedIndicators = props.selection.indicators
    ? props.selection.indicators.map((indicator) => indicator.name)
    : [];

  const handleAggregation = () => {
    const array = [];
    const data = Object.values(tractInfo).filter((tract) =>
      utils.filterBySelection(tract, props.selection)
    );
    indicatorInfo.forEach((indicator) => {
      const aggregatedData = utils.aggregate(data, indicator, "Subarea");
      aggregatedData["indicator"] = indicator.name;
      array.push(aggregatedData);
    });

    data.forEach((tract) =>
      !headerArray.includes(tract.Subarea)
        ? headerArray.push(tract.Subarea)
        : null
    );

    headerArray.sort((a, b) =>
      parseInt(a.replace("Subarea ", "")) < parseInt(b.replace("Subarea ", ""))
        ? -1
        : 1
    );
    setHeader(headerArray);

    array.sort((a, b) => (a.Subarea < b.Subarea ? -1 : 1));
    setData(array);
  };

  const rows = [];

  const handleCreateRows = () => {
    const headerCells = header.map((header, i) => (
      <Cell
        key={`header-${i}`}
        className={`table-cells ${i !== 0 ? "header-cell" : ""}`}
        style={{
          backgroundColor:
            header === `Subarea ${props.highlightedSubarea}`
              ? "lightgrey"
              : null,
          padding: "1em",
        }}
      >
        {i === 0 ? (
          <ExportButton
            data={dataForExport(data)}
            //
            csvTitle={
              `TITLE: MAHS Submarket Summary ${props.selectedGeo} ` +
              "\nSOURCE: MAHS DATA EXPLORER - https://metroatlhousing.org/dataexplorer"
            }
            csvFilename={`MAHS-Submarket-Summary-${props.selectedGeo
              .split(" ")
              .join("-")}-${moment().format("M/DD/YYYY")}`}
            content={"Download Data"}
          />
        ) : (
          header.replace("Subarea", "Submarket")
        )}
      </Cell>
    ));

    rows.push(<Row key="header-row">{headerCells}</Row>);

    indicatorInfo
      .filter((indicator) => selectedIndicators.includes(indicator.name))
      .forEach((indicator, r) => {
        const cells = [];

        header.forEach((item, c) =>
          cells.push(
            <Cell
              key={`${c}-${r}`}
              className="table-cell"
              style={{
                backgroundColor:
                  item === `Subarea ${props.highlightedSubarea}`
                    ? "lightgrey"
                    : null,
              }}
            >
              {c === 0 ? (
                <div className="indicator-column">{indicator.name}</div>
              ) : (
                numeral(data[r][item]).format(
                  indicator.formatter.replace(/"/g, "")
                )
              )}
            </Cell>
          )
        );
        rows.push(<Row key={r}>{cells}</Row>);
      });
  };

  const dataForExport = (inputDataArray) => {
    const outputDataArray = [];
    const headerArray = [...header];

    inputDataArray
      .filter((inputData) => selectedIndicators.includes(inputData.indicator))
      .forEach((inputData) => {
        const dataObj = {};
        headerArray.forEach(
          (header) =>
            (dataObj[header.replace("Subarea", "Submarket")] =
              inputData[header])
        );
        outputDataArray.push(dataObj);
      });

    return outputDataArray;
  };

  handleCreateRows();

  useEffect(handleAggregation, [props.selection]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "4px",
      }}
      id="table"
    >
      <StickyTable stickyHeaderCount={1}>{rows}</StickyTable>
    </div>
  );
};

export default Table;
