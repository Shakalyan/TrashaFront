export const CHOOSE_EXERCISE = "CHOOSE_EXERCISE";

export function chooseExercise(exercise) {
    return {
        type: CHOOSE_EXERCISE,
        exercise: exercise
    }
}