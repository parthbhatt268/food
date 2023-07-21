import * as React from "react";
import {
  Card,
  CardActions,
  CardMedia,
  Button,
  Paper,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import { connect } from "react-redux";
import { saveDish } from "../../Store/AsyncThunk/orderAsync";
import "../Menu/Menu.css";

const MediaCard2 = (props) => {
  const [itemCount, setItemCount] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [selectedItem, setSelectedItem] = useState([]);
  let count = 0;

React.useEffect(() => {
  const foundDish = props.savedDish.filter(row => row.p_name === props.name)
  if(foundDish.length > 0){
    setToggle(false)
    setItemCount(foundDish[0].p_itemCount)
  }else{
    setToggle(true)
  }
},[props.name])
  const handleAdd = () => {
    count = count + 1;
    setToggle(false);
    setItemCount(itemCount + 1);
    const itemcountSavedDish = props.savedDish.filter(row => row.p_name === props.name)
    setItemCount(itemcountSavedDish.length > 0 ? itemcountSavedDish[0].p_itemCount + 1 : 1);
    let payload = {};
    payload.p_name = props.name;
    payload.p_itemCount = itemcountSavedDish.length > 0 ? itemcountSavedDish[0].p_itemCount + 1 : 1;
    payload.p_price = props.price;
    payload.p_amount = props.price * (itemcountSavedDish.length > 0 ? itemcountSavedDish[0].p_itemCount + 1 : 1);

    setSelectedItem(payload);
    props.saveDish(payload);
  };

  const handleSub = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
      count = count - 1;
    } else {
      setToggle(true);
    }
    let payload = {};
    payload.p_name = props.name;
    payload.p_itemCount = itemCount - 1;
    payload.p_price = props.price;
    payload.p_amount = props.price * (itemCount - 1);
    setSelectedItem(payload);
   props.saveDish(payload);

   
  };
  return (
    <>
      <Card className="ParentCard">
        <CardMedia
          sx={{ height: 228, borderRadius: "21px" }}
          image={`data:image/jpeg;base64,${props.image}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" className="itemName">
            {props.name}
          </Typography>
        </CardContent>
        <CardActions
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Typography className="itemName">₹{props.price}</Typography>
          <div>
          {toggle === true && (
            <Button className="AddtoCartButton" onClick={handleAdd}>
              Add To Cart
            </Button>
          )}
          </div>
          <div
            style={{
              display: "flex",
              borderRadius: "10px",
              border: "1px solid #F75D10",
              background: "#FFF",
            }}
          >
            {toggle === false && (
              <Button className="Itemcount" onClick={handleSub}>
                <RemoveIcon fontSize="small" />
              </Button>
            )}
            {toggle === false && (
              <Paper
                elevation={0}
                style={{
                  margin: "5px",
                  marginLeft: "8px",
                }}
              >
                {itemCount}
              </Paper>
            )}
            {toggle === false && (
              <Button className="Itemcount" onClick={handleAdd}>
                <AddIcon fontSize="small" />
              </Button>
            )}
          </div>
        </CardActions>
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    savedDish: state.savedDish,
  };
};

const mapDispatchToProps = {
  saveDish,
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaCard2);
