/**
 * Validates if the provided birthday corresponds to an adult (18 years or older).
 * @param birthday - The user's birthday.
 * @returns `true` if the user is 18 years or older, otherwise `false`.
 */
export const validateAdult = (birthday: Date): boolean => {
  const today = new Date()
  const age = today.getFullYear() - birthday.getFullYear()
  const isBeforeBirthdayThisYear =
    today.getMonth() < birthday.getMonth() ||
    (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate())

  return age > 18 || (age === 18 && !isBeforeBirthdayThisYear)
}
