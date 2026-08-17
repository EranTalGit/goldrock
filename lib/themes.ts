export type ThemeId = "night" | "limestone" | "bronze";

export const THEMES: {
  id: ThemeId;
  name: string;
  headline: string;
  pitch: string;
}[] = [
  {
    id: "night",
    name: "לילה וזהב",
    headline: "העיצוב החי עכשיו",
    pitch: "אטלייה כהה, שיש שחור וזהב שמפניה. יוקרה חזקה, מתאים למותג Goldrock.",
  },
  {
    id: "limestone",
    name: "שיש בהיר",
    headline: "אור, קרם ואבן חיה",
    pitch: "אתר בהיר כמו רצפה אחרי פוליש. אוויר, ניקיון, תחושת דירה יוקרתית באור יום.",
  },
  {
    id: "bronze",
    name: "ברונזה חמה",
    headline: "אבן, נחושת ואור שקיעה",
    pitch: "כהה יותר רך מהלילה. חום, ברונזה, פחות זהב קר. תחושת סדנה ולא מלון.",
  },
];
