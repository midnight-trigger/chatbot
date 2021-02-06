import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Chat from './Chat';

const useStyles = makeStyles(() => (
  createStyles({
    "chats": {
      padding: '0',
      overFlow: "auto",
      height: 400,
    }
  })
));

const Chats = (props) => {
  const classes = useStyles();
  return (
    <List className={classes.chats} id="scroll-area">
      {props.chats.map((value, index) => {
        return <Chat
                text={value.text}
                type={value.type}
                key={index.toString()}
               />
      })}
    </List>
  );
}

export default Chats;
