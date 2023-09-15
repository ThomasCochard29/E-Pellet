import React, { useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";

// Image
import IconAllCustomers from "../../../assets/icon/groupe-utilisateurs.png";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getCountUser } from "../../../actions/user.action";

export default function CardAllClient() {
  //! ----------------- REDUX -----------------
  const dispatch = useDispatch();
  const userCount = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(getCountUser());
  }, [dispatch]);

  return (
    // All Customer
    <Card className="card-body">
      <CardContent>
        <div className="card-div-icon">
          <img
            src={IconAllCustomers}
            alt="Icon commande réussie"
            width={60}
            className="card-icon"
          />
        </div>
        <Typography className="card-typo-number" variant="p" component="div">
          {userCount.data}
        </Typography>
        <Typography variant="p" component="div">
          Client Total
        </Typography>
      </CardContent>
    </Card>
  );
}
