import React from "react";
import "./issues.Component.css";
import AlbumIcon from "@material-ui/icons/Album";
import Label from "./label.Component";

interface Props {
  title: string;
  login: string;
  labels: Array<object>;
  date: Date;
}
const IssueCard: React.FC<Props> = ({ title, login, labels, date }: Props) => {
  const newDate = new Date(date);
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <div style={{ padding: "20px 30px" }} className="issue">
      <div className="issue__heading">
        <AlbumIcon
          style={{
            color: "green",
            width: "20px",
            marginRight: "5px",
          }}
        />
        {title}
        {labels &&
          labels.map((label: any, i: number) => {
            return <Label key={i} color={label!.color} name={label!.name} />;
          })}
      </div>
      <div style={{ fontSize: "10px", marginLeft: "10px" }}>
        opened on {months[newDate.getMonth()]} {newDate.getDate()} by {login}
      </div>
    </div>
  );
};

IssueCard.defaultProps = {
  login: "",
  labels: [],
};

export default IssueCard;
