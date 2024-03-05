import { Swiper, SwiperSlide } from "swiper/react";
import { Box } from "@mui/material";
import { Image } from "mui-image";
import "swiper/css/autoplay";
import "swiper/css";
import { useContext } from "react";
import Skeleton from "@mui/material/Skeleton";
import { bannerContext } from "../context/BannersContext";

const BannerCarousel = () => {
  const { banner, banner_loading } = useContext(bannerContext);

  return (
    <Box
      boxShadow="0 4px 2px -2px rgba(0, 0, 0, 0.2)"
      bgcolor="primary.main"
      overflow="hidden"
      p={1.6}
      pt={0}
      sx={{ borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}
    >
      {banner_loading ? (
        <Skeleton height={200} />
      ) : (
        <Swiper
          autoplay={true}
          style={{ borderRadius: 12 }}
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
        >
          {banner.docs.map((doc) => {
            return (
              <SwiperSlide key={doc.id}>
                <Box height={{ xs: 200, md: 280 }}>
                  <Image
                    src={doc.data().url}
                    fit
                    sx={{ borderRadius: 2 }}
                    shift="right"
                  />
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </Box>
  );
};

export default BannerCarousel;
