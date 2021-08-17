import React from "react";
import { ExportToCsv } from "export-to-csv";
import { Icon } from "semantic-ui-react";
import moment from "moment";
import "./style.css";

const ExportButton = (props) => {
  const csvTitle = props.csvTitle ? props.csvTitle : null;
  const csvFilename = props.csvFilename
    ? props.csvFilename
    : `download-${moment().format()}`;
  const csvHeaders = props.csvHeaders ? props.csvHeaders : null;
  const data = props.data ? props.data : [{}];

  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    filename: csvFilename,
    showTitle: csvTitle ? true : false,
    showLabels: true,
    title: csvTitle,
    useTextFile: false,
    useKeysAsHeaders: csvHeaders ? false : true,
  };

  const csvExporter = data ? new ExportToCsv(csvOptions) : null;

  return (
    <Icon
      name="download"
      size="large"
      onClick={() =>
        data.length > 0
          ? csvExporter.generateCsv(data)
          : console.log("No Data for CSV Button")
      }
    />
  );
};

export default ExportButton;
