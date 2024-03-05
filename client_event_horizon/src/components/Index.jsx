import BannerCarousel from "./BannerCarousel";
import { Typography, Box } from "@mui/material";
import EventCard from "./EventCard";
import Committees from "./Committees";
import { Swiper, SwiperSlide } from "swiper/react";
import upcoming_events from "../data/upcoming_events";
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

const Index = () => {
  const { committees, committees_loading } = useContext(committeesContext);
  const { categories, categories_loading } = useContext(categoriesContext);

  return (
    <div>
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
            slidesOffsetAfter={30}
            spaceBetween={50}
            freeMode={true}
            modules={[FreeMode]}
            breakpoints={{
              640: {
                slidesPerView: 7,
                spaceBetween: 0,
              },
            }}
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
                console.log(doc.data());
                return (
                  <SwiperSlide key={doc.id}>
                    <Categories props={doc.data()} />
                  </SwiperSlide>
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
                <SwiperSlide key={doc.id}>
                  <Committees props={doc.data()} />
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </Box>
      </Box>
      {/* Upcoming Events */}
      <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" px={2}>
            Upcoming Events
          </Typography>
          <ShowAllbtn to="" />
        </Box>
        <Box
          pb={2}
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
          <ShowAllbtn to="" />
        </Box>
        <Box display={{ xs: "none", md: "block" }}>
          <Swiper
            style={{ paddingBottom: 16 }}
            slidesPerView={4.2}
            slidesOffsetBefore={10}
            slidesOffsetAfter={10}
          >
            {upcoming_events.map((data) => {
              return (
                <SwiperSlide key={data.id}>
                  <EventCard props={data} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </Box>
    </div>
  );
};

export default Index;
