import { Component, OnInit } from "@angular/core";
import { JsonToCSVServiceService } from "./JsonToCSVService.service";
import { formatDate } from "@angular/common";

class DataRow {
  constructor(
    public date: string,
    public moneySpent: number,
    public profit: number,
    public profitIndex: number = 0
  ) {}
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "ConverterToCSV";
  headers: string[] = [
    "Date",
    "Invested cash ($)",
    "Expected cash flows ($)",
    "Net present value ($)"
  ];
  dataRows: DataRow[];

  constructor(private jsonToCSVService: JsonToCSVServiceService) {}

  ngOnInit() {
    this.dataRows = [
      new DataRow("2019/04/10", 0.6, 5.3),
      new DataRow("2019/05/18", 2.1, 3.6),
      new DataRow("2019/08/11", 6.4, 2.2),
      new DataRow("2019/10/25", 1.1, 8.1),
      new DataRow("2020/01/17", 0.1, 9.8)
    ];

    this.onDataChange();
  }

  onDataChange() {
    let totalProfit: number = 0;
    let totalMoneySpent: number = 0;

    for (let i = 0; i < this.dataRows.length; i++) {
      totalMoneySpent += this.dataRows[i].moneySpent;
      totalProfit += this.dataRows[i].profit;
      this.dataRows[i].profitIndex = totalProfit - totalMoneySpent;
    }
  }

  onExport(fileName: string) {
    this.jsonToCSVService.downloadFile(this.dataRows, this.headers, fileName);
  }

  onAddRow() {
    this.dataRows.push(
      new DataRow(formatDate(Date.now(), "yyyy/MM/dd", "en"), 0.1, 0.3)
    );
    this.onDataChange();
  }

  onDeleteRow() {
    this.dataRows.pop();
    this.onDataChange;
  }
}
