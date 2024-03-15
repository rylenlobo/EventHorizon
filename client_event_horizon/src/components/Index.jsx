import BannerCarousel from "./BannerCarousel";
import { Typography, Box, Fade, Button } from "@mui/material";
import EventCard, { EventCardSkeleton } from "./EventCard";
import Committees from "./Committees";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import ShowAllbtn from "./ShowAllbtn";
import { FreeMode } from "swiper/modules";
import Categories from "./Categories";
import { useContext } from "react";
import { committeesContext } from "../context/CommitteesContext";
import { CommitteesSkeleton } from "./Committees";
import { categoriesContext } from "../context/CategoriesContext";
import { CategoriesSkeleton } from "./Categories";
import { useNavigate } from "react-router-dom";
import { indexEvents } from "../context/IndexEvents";
import { TransitionGroup } from "react-transition-group";

const Index = () => {
  const { committees, committees_loading } = useContext(committeesContext);
  const { categories, categories_loading, setState, setFilter } =
    useContext(categoriesContext);
  const { upcoming_events, upcoming_events_loading } = useContext(indexEvents);

  const navigate = useNavigate();

  return (
    <TransitionGroup>
      <Fade>
        <Box>
          <BannerCarousel />
          {/* Categories */}
          <Box mt={2} display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6" px={2}>
              Categories
            </Typography>
            <Box>
              <Swiper
                slidesPerView={2.5}
                slidesOffsetBefore={16}
                slidesOffsetAfter={16}
                spaceBetween={50}
                freeMode={true}
                modules={[FreeMode]}
              >
                {categories_loading ? (
                  <>
                    <SwiperSlide>
                      <CategoriesSkeleton />
                    </SwiperSlide>
                    <SwiperSlide>
                      <CategoriesSkeleton />
                    </SwiperSlide>
                    <SwiperSlide>
                      <CategoriesSkeleton />
                    </SwiperSlide>
                  </>
                ) : (
                  categories.docs.map((doc) => {
                    return (
                      <Fade
                        key={doc.id}
                        in={
                          upcoming_events_loading &&
                          categories_loading &&
                          committees_loading
                        }
                      >
                        <SwiperSlide>
                          <Categories
                            props={doc.data()}
                            handleCategories={() => {
                              // Update the state
                              setState((prevState) => ({
                                ...prevState,
                                [doc.data().name]: true,
                              }));

                              // Update the filter
                              setFilter((prevFilter) => [
                                ...prevFilter,
                                doc.data().name,
                              ]);
                              navigate("/events");
                            }}
                          />
                        </SwiperSlide>
                      </Fade>
                    );
                  })
                )}
              </Swiper>
            </Box>
          </Box>
          {/* Committess */}
          <Box my={2} mb={3} display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6" px={2}>
              Discover Events by Committees
            </Typography>

            <Box>
              <Swiper
                slidesPerView={1.2}
                freeMode={true}
                spaceBetween={13}
                slidesOffsetBefore={16}
                slidesOffsetAfter={16}
                breakpoints={{
                  640: {
                    slidesPerView: 4,
                    spaceBetween: 50,
                  },
                }}
                modules={[FreeMode]}
              >
                {committees_loading ? (
                  <>
                    <SwiperSlide>
                      <CommitteesSkeleton />
                    </SwiperSlide>
                    <SwiperSlide>
                      <CommitteesSkeleton />
                    </SwiperSlide>
                  </>
                ) : (
                  committees.docs.map((doc) => (
                    <Fade
                      key={doc.id}
                      in={
                        upcoming_events_loading &&
                        categories_loading &&
                        committees_loading
                      }
                    >
                      {" "}
                      <SwiperSlide key={doc.id}>
                        <Committees props={doc.data()} />
                      </SwiperSlide>
                    </Fade>
                  ))
                )}
              </Swiper>
            </Box>
          </Box>
          {/* Upcoming Events */}
          <Box display="flex" flexDirection="column" gap={2}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6" px={2}>
                Upcoming Events
              </Typography>
              <ShowAllbtn to="events" />
            </Box>
            <Box
              pb={2}
              display={{ xs: "flex", md: "none" }}
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap={3}
            >
              {upcoming_events_loading ? (
                <>
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                  <EventCardSkeleton />
                </>
              ) : (
                upcoming_events.docs.map((doc) => (
                  <Box key={doc.id}>
                    <EventCard id={doc.id} props={doc.data()} />
                  </Box>
                ))
              )}
              <ShowAllbtn to="events" />
            </Box>
          </Box>
        </Box>
      </Fade>
    </TransitionGroup>
  );
};

export default Index;
