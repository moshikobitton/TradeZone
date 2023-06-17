import { Box } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const colors = tokens();
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How can I use the histogram chart?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            With the histogram chart you can investigate the global trades and
            do comparison between states. In fact, the value there is the total
            sum of the product on selected year. but you can also see all the
            total of export and import all over the years. by clicking on
            animation you can investigate treds over the years. You can select
            each year from 1990 to 2021. Notice, you can select the number of
            countries with the slider.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How can I use the bar chart?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            With the bar chart you can investigate the global trades and do
            comparison between states. In fact, the value there is the total sum
            of the product on selected year.
            <br />
            You can select each year from 1990 to 2021. Notice, you can select
            up to 10 countries and see the differences.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How can I use the line chart?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            With the line chart you can investigate the global trades and do
            comparison between states over the years. In fact, the value there
            is the total sum of the product <br /> and you can see the progress
            over the years. Notice, you can select up to 7 countries and see the
            differences.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How can I use the pie chart?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            With the pie chart you can investigate the global trades and do
            comparison between categories over the years. In fact, the value
            there is the precent of the products <br />
            from all the products that you chose. You can select each year from
            1990 to 2021. Notice, you can select up to 5 products and see the
            differences.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How can I use the geo chart?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            With the geo chart you can investigate the global trades and do
            comparison between countries and products over the years. In fact,
            the value there is the accurate value in USD of the products that
            you chose. You can select each year from 1990 to 2021 (you need to
            use the slider). Notice, you can select up to 3 products and see the
            differences. Also, you can click the animation button and the
            computer will show you the changes over the years.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What is Newman algorithm?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The Girvan-Newman algorithm detects communities by progressively
            removing edges from the original network. The connected components
            of the remaining network are the communities. Instead of trying to
            construct a measure that tells us which edges are the most central
            to communities, the Girvan-Newman algorithm focuses on edges that
            are most likely "between" communities.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How can I use the network chart?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            With the network chart you can create a social network and see the
            connections between states. You can change product or year and see
            how to network changes. By default, the network split to communities
            with the newman algorithm. You can change the size of the nodes
            according the newman group and see if newman algorithm split to
            communities according the continet of the country. Also, the "stats"
            button allow you to see the newman result in precent, and show you
            more detailed measures.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
