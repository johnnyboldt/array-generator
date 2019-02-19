import ArraySortType from "./Enums/ArraySortType";

// Holds default values, error messages, and constants.
export class Globals {
  // Urls
  public static readonly PORT = "44334"; //IMPORTANT! This will need to be updated with whatever port the ArrayGenerator backend uses when you run it
  public static readonly SHUFFLEDARRAY_ROOT_URL = `https://localhost:${
    Globals.PORT
  }/api/ShuffledArray/`;
  public static readonly SORTEDARRAY_ROOT_URL = `https://localhost:${
    Globals.PORT
  }/api/SortedArray/`;

  // Defaults
  public static readonly defaultMinimumNumber = 1;
  public static readonly defaultMaximumNumber = 10000;
  public static readonly defaultCommaDelimited = true;
  public static readonly defaultNewlineDelimited = false;
  public static readonly defaultSpaceDelimited = true;
  public static readonly defaultArraySortType = ArraySortType.Shuffled;

  // Need to set these because Copy Text to Clipboard package does not work with ranges that are too large
  public static readonly minimumAllowableNumber = -15000;
  public static readonly maximumAllowableNumber = 15000;

  // Errors
  public static readonly MinGreaterThanMaxError =
    "Minimum Number can not be greater than Maximum Number.";
  public static readonly MinLessThanAllowed = `Minimum Number can not be less than ${
    Globals.minimumAllowableNumber
  }.`;
  public static readonly MaxGreaterThanAllowed = `Maximum Number can not be greater than ${
    Globals.maximumAllowableNumber
  }.`;
}
