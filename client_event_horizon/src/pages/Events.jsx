import { Box, TextField, InputAdornment, Chip } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import upcoming_events from "../data/upcoming_events";
import EventCard from "../components/EventCard";

const Events = () => {
  return (
    <>
      <Box display="flex" flexDirection="column">
        <Box p={2}>
          <TextField
            placeholder="Search for Events"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box
          px={2}
          display="flex"
          overflow="scroll"
          gap={2}
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Chip label="All Categories" />
          <Chip label="Technical" />
          <Chip label="Sports" />
          <Chip label="Seminars" />
          <Chip label="Workshops" />
        </Box>
        <Box
          p={2}
          display={{ xs: "flex", md: "none" }}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={3}
        >
          {upcoming_events.map((data) => (
            <>
              <EventCard props={data} />
            </>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Events;
