import React from "react";

// styles
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers/Wrappers";

export default function PageTitle(props) {
  var classes = useStyles();

  return (
    <div className={classes.pageTitleContainer}>
      <Typography className={classes.typo} variant="h1" size="sm">
        {props.title}
      </Typography>
      <div className={classes.time}>
        <Typography size='md' weight="bold" noWrap>
          {props.time}
        </Typography>
        {props.button && props.button}
        
      </div>
    </div>
  );
}
