import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { Box, Stack, Typography } from "@mui/material";
import { fetchData, exerciseOptions } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";

const Exercises = ({ setExercises, bodyPart, exercises }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisePage = 9;

  const indexOfLastExercise = currentPage * exercisePage;
  const indexOfFirstExercise = indexOfLastExercise - exercisePage;

  const currentExercise = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );
  const paginate = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if (bodyPart === "all") {
        exercisesData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises",
          exerciseOptions
        );
      } else {
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions
        );
      }
      setExercises(exercisesData);
    };
    fetchExercisesData();
  }, [bodyPart]);
  return (
    <Box id="exercises" sx={{ mt: { lg: "100px" } }} mt="50px" p="20px">
      <Typography variant="h3" mb="40px">
        Showing Results
      </Typography>
      <Stack
        direction="row"
        sx={{ gap: { lg: "110px", xs: "50px" } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {currentExercise.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </Stack>
      <Stack sx={{ mt: { lg: "114px", xs: "70px" } }} alignItems="center">
        {exercises.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisePage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
