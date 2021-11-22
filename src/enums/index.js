/**
 * You can hide activities by excluding from this list completely, or by giving a skill
 * that governs visibility of the activity
 */
export const ActivitySettings = {
  "Available": {
    requiredSkill: null,
    sortOrder: 0,
  },
  "Offline": {
    requiredSkill: "testing",
    sortOrder: 1,
  },
  "Unavailable": {
    requiredSkill: "testing",
    sortOrder: 2,
  },
  "Logged In": {
    requiredSkill: "testing",
    sortOrder: 3,
  },
  "Break": {
    requiredSkill: null,
    sortOrder: 4,
  },
  "On a Task": {
    requiredSkill: "testing",
    sortOrder: 5,
  },
  "On a Task, No ACD": {
    requiredSkill: "testing",
    sortOrder: 6,
  },
  "Wrap Up": {
    requiredSkill: "testing",
    sortOrder: 7,
  },
  "Wrap Up, No ACD": {
    requiredSkill: "testing",
    sortOrder: 8,
  },
};
