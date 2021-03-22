import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { commerce } from "../../../../lib/commerce";
import useStyles from "./styles";
import Grid from "@material-ui/core/Grid";
import { AddShoppingCart } from "@material-ui/icons";
import Products from "../../Products";

const PPage = ({ onAddToCart }) => {
  const classes = useStyles();
  const { id } = useParams();
  const [productData, setProductData] = useState(null);

  useEffect(async () => {
    const pData = await commerce.products.retrieve(id);
    setProductData(pData);
  }, [id]);
  console.log("productData", productData);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {productData && (
        <>
          <Card className={classes.root}>
            <CardMedia
              className={classes.media}
              image={productData.media.source}
              title={productData.name}
            />
            <CardContent>
              <div className={classes.cardContent}>
                <Typography variant="h5" gutterBottom>
                  {productData.name}
                </Typography>
                <Typography variant="h5">
                  {productData.price.formatted_with_symbol}
                </Typography>
              </div>
              <Typography
                variant="body2"
                color="textSecondary"
                dangerouslySetInnerHTML={{ __html: productData.description }}
              />
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
              <IconButton
                aria-label="Add to Cart"
                onClick={() => onAddToCart(productData.id, 1)}
              >
                <AddShoppingCart />
              </IconButton>
            </CardActions>
          </Card>

          <Container>
            <Grid Container justify="center">
              {productData.assets.map((asset) => (
                <img src={asset.url} width={400} />
              ))}
            </Grid>
          </Container>
          <Container>
            <div>You may also like:</div>

            <Products
              products={productData.related_products}
              onAddToCart={onAddToCart}
            />
          </Container>
        </>
      )}
    </main>
  );
};

export default PPage;
