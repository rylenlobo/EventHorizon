import React from "react";
import { Box, Typography, Fade, Skeleton } from "@mui/material";
import { EventCardSkeleton } from "../components/EventCard";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { fireDB } from "../firebase/firbaseConfig";
import { useParams } from "react-router-dom";
import { TransitionGroup } from "react-transition-group";
import EventCard from "../components/EventCard";
import NoResultsFound from "../components/NoResultsFound";

const CommitteeEvents = () => {
  const param = useParams();
  const [data, loading] = useCollection(
    query(collection(fireDB, "events"), where("committee", "==", param.name))
  );

  if (loading) {
    return (
      <Box>
        <TransitionGroup>
          <Typography
            variant="h5"
            fontWeight={600}
            color="initial"
            p={2}
            pb={1}
          >
            <Skeleton />
          </Typography>

          <Fade>
            <Box
              p={2}
              display={{ xs: "flex", md: "none" }}
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap={3}
            >
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </Box>
          </Fade>
        </TransitionGroup>
      </Box>
    );
  }

  if (data.docs.length === 0) {
    return (
      <>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          style={{ height: "80vh" }} // Adjust as needed
        >
          <NoResultsFound />
        </Box>
      </>
    );
  }

  return (
    <>
      <Box>
        <Typography variant="h5" fontWeight={600} color="initial" p={2} pb={0}>
          Events by {param.name}
        </Typography>
        <TransitionGroup>
          {data.docs.map((doc) => (
            <Fade key={doc.id}>
              <Box
                p={2}
                display={{ xs: "flex", md: "none" }}
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap={3}
              >
                <EventCard id={doc.id} props={doc.data()} />
              </Box>
            </Fade>
          ))}
        </TransitionGroup>
      </Box>
    </>
  );
};

export default CommitteeEvents;
