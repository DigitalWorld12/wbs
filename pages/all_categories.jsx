import Head from "next/head";
import styles from "../styles/AllCategories.module.css";
import React from "react";
import Image from "next/image";
import Icon, { FontAwesome, Feather } from "react-web-vector-icons";
import Footer from "../src/components/footer/Footer";
import Topbar from "../src/components/topbar/Topbar";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import ReadyToBaner from "../src/components/slider/ReadyToBaner";

function all_categories() {
  return (
    <>
      <div className={styles.container}>
        <Topbar></Topbar>

        <div className={styles.all_categories_width_90}></div>

        <div className={styles.all_categories_height_100}></div>
        <h1 className={styles.all_categories_heading}>ALL CATEGORIES</h1>

        <div className={styles.all_categories_width_85}>
          <div className={styles.all_categories_width_90_Left_20}>
            <h2 className={styles.all_categories_fontDecoration}>Actor</h2>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Link href="/artist_profile">
                    <h4 className={styles.all_categories_color_white}>
                      Disney ( 323 )
                    </h4>
                  </Link>
                </Grid>
                <Grid item xs={2}>
                  <Link href="/artist_profile">
                    <h4 className={styles.all_categories_color_white}>
                      Lollywood ( 323 )
                    </h4>
                  </Link>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Netflix ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    BBC ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Hollywood( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Movies ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    HBO ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Film ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Voice Actor ( 323 )
                  </h4>
                </Grid>
              </Grid>
            </Box>
            <div className={styles.all_categories_container_width_100}></div>
          </div>

          <div className={styles.all_categories_width_90_Left_20}>
            <h2 className={styles.all_categories_fontDecoration}>Athletes</h2>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Football ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Cricket ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Netflix ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    BBC ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Hollywood( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Movies ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    HBO ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Film ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Voice Actor ( 323 )
                  </h4>
                </Grid>
              </Grid>
            </Box>
            <div className={styles.all_categories_container_width_100}></div>
          </div>

          <div className={styles.all_categories_width_90_Left_20}>
            <h2 className={styles.all_categories_fontDecoration}>Comedians</h2>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Disney ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Lollywood ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Netflix ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    BBC ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Hollywood( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Movies ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    HBO ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Film ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Voice Actor ( 323 )
                  </h4>
                </Grid>
              </Grid>
            </Box>
            <div className={styles.all_categories_container_width_100}></div>
          </div>

          <div className={styles.all_categories_width_90_Left_20}>
            <h2 className={styles.all_categories_fontDecoration}>Creators</h2>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Disney ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Lollywood ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Netflix ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    BBC ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Hollywood( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Movies ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    HBO ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Film ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Voice Actor ( 323 )
                  </h4>
                </Grid>
              </Grid>
            </Box>
            <div className={styles.all_categories_container_width_100}></div>
          </div>

          <div className={styles.all_categories_width_90_Left_20}>
            <h2 className={styles.all_categories_fontDecoration}>Musicians</h2>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Disney ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Lollywood ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Netflix ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    BBC ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Hollywood( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Movies ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    HBO ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Film ( 323 )
                  </h4>
                </Grid>
                <Grid item xs={2}>
                  <h4 className={styles.all_categories_color_white}>
                    Voice Actor ( 323 )
                  </h4>
                </Grid>
              </Grid>
            </Box>
            <div className={styles.all_categories_container_width_100}></div>
          </div>
        </div>
      </div>
      <div>
        <ReadyToBaner />
      </div>

      <Footer></Footer>
    </>
  );
}
export default all_categories;
