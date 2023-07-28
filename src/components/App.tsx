import React, { useState } from "react";
import { Button } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import CircularProgress from "@material-ui/core/CircularProgress";
import { OrderDirection, useGetissuesQuery } from "../generated/graphql";
import IssueCard from "./issues.Component";
import "./App.css";

const App: any = () => {
  const [author, setAuthor] = useState<string | null>(null);
  const [labels, setLabels] = useState<Array<string> | null>(null);
  const [name, setName] = useState("react");
  const [owner, setOwner] = useState("Facebook");
  const [order, setOrder] = useState(OrderDirection.Desc);
  const [orderType, setOrderType] = useState(true);
  const [textAuthor, setTextAuthor] = useState("");
  const [textLabel, setTextLabel] = useState("");

  const { error, data, loading } = useGetissuesQuery({
    variables: {
      author,
      name,
      owner,
      labels,
      order,
    },
    fetchPolicy: "network-only",
  });

  const handleDirection = () => {
    if (order === "ASC") {
      setOrderType(true);
      setOrder(OrderDirection.Desc);
    } else {
      setOrderType(false);
      setOrder(OrderDirection.Asc);
    }
  };
  return (
    <div className="container">
      <div className="main">
        <form
          style={{
            width: "40%",
            display: "flex",
          }}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            placeholder="enter repository name"
            value={name}
            required
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setName(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="enter repository owner"
            value={owner}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setOwner(e.target.value)}
            className="input input-2"
          />
          <Button
            type="submit"
            variant="outlined"
            style={{
              backgroundColor: "white",
              marginLeft: "10px",
            }}
          >
            Submit
          </Button>
        </form>
      </div>

      <div
        style={{
          width: "100%",
          height: "70px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          style={{
            width: "40%",
            display: "flex",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            if (textAuthor === "" && textLabel === "") {
              setAuthor(null);
              setLabels(null);
            } else if (textAuthor === "" && textLabel !== "") {
              setAuthor(null);
              setLabels([textLabel]);
            } else if (textAuthor !== "" && textLabel === "") {
              setAuthor(textAuthor);
              setLabels(null);
            } else {
              setAuthor(textAuthor);
              setLabels([textLabel]);
            }
          }}
        >
          <input
            type="text"
            placeholder="search by author"
            value={textAuthor}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setTextAuthor(e.target.value)}
            className="input input-2"
          />
          <input
            type="text"
            placeholder="search by label"
            value={textLabel}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setTextLabel(e.target.value)}
            className="input"
          />
          <Button
            type="submit"
            variant="outlined"
            style={{
              backgroundColor: "white",
              marginLeft: "10px",
            }}
          >
            Submit
          </Button>
        </form>
        <Button
          startIcon={orderType ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          variant="outlined"
          style={{
            backgroundColor: "white",
            marginLeft: "10px",
          }}
          onClick={handleDirection}
        >
          Newest
        </Button>
      </div>
      {error && <h1>{error.message}</h1>}
      {loading || !data ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "4rem",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <ul style={{ width: "90%" }}>
          {data?.repository?.issues.nodes &&
          data?.repository?.issues.nodes.length === 0 ? (
            <h1
              style={{
                color: "white",
              }}
            >
              No issue found
            </h1>
          ) : null}
          {data?.repository?.issues.nodes && (
            <div>
              <h3
                style={{
                  color: "white",
                  fontFamily: "cursive",
                  padding: "20px 30px",
                  marginTop: "50px",
                }}
              >
                {data?.repository?.issues.totalCount} Issues found in repository
                of {name} by {owner}
              </h3>
              {data?.repository?.issues.nodes.map((doc: any, i: number) => {
                return (
                  <IssueCard
                    title={doc!.title}
                    labels={doc!.labels?.nodes}
                    login={doc!.author?.login}
                    date={doc!.createdAt}
                    key={i}
                  />
                );
              })}
            </div>
          )}
        </ul>
      )}
    </div>
  );
};

export default App;
