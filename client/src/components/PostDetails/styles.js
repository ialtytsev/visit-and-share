import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  media: {
    borderRadius: "20px",
    objectFit: "cover",
    width: "100%",
    maxHeight: "600px",
  },
  card: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
      flexDirection: "column-reverse",
      alignItems: "center",
    },
  },
  section: {
    borderRadius: "20px",
    margin: "10px",
    flex: 3,
  },
  imageSection: {
    marginLeft: "20px",
    flex: 2,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  mainContainer: {
    margin: "15px 0px",
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
  },
  recommendCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "10px",
    borderRadius: "15px",
    minHeight: "100%",
    position: "relative",
    cursor: "pointer",
  },
  recommendImage: {
    borderRadius: "15px",
    objectFit: "cover",
    width: "100%",
    height: "200px",
  },
  loadingPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    height: "39vh",
  },
  commentsOuterContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  commentsInnerContainer: {
    height: "200px",
    overflowY: "auto",
    marginRight: "30px",
  },
}));
