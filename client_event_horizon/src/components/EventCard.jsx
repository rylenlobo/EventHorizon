/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Chip, Avatar } from "@mui/material";

import sfit_logo from "../assets/sfit-logo.png";
import { useNavigate } from "react-router-dom";

const EventCard = ({ props }) => {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => {
        navigate(`/events/${props.id}`);
      }}
    >
      <Card sx={{ width: 330 }}>
        <Box position="relative">
          <CardMedia
            sx={{ height: 120 }}
            image={props.event_image}
            title="DJ Night"
          />
          <Box
            p={1}
            width="100%"
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="end"
            sx={{
              top: 2,
            }}
          >
            <Avatar
              src={props.college == "SFIT" ? sfit_logo : " "}
              sx={{ height: 30, width: 30 }}
            />
          </Box>
        </Box>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={1 / 2}>
            <Box display="flex" gap={1}>
              <Chip
                label={"\u20B9" + props.price}
                size="small"
                color={"primary"}
              />
              <Chip
                label={props.category}
                size="small"
                sx={{ color: "text.grey" }}
              />
            </Box>
            <Typography variant="caption" color="text.grey">
              {props.day +
                ", " +
                props.date +
                ", " +
                props.time.start +
                " - " +
                props.time.end}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {props.event_name}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventCard;
