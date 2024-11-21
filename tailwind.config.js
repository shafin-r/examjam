/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "montblack": ["Montserrat-Black"],
        "montblackitalic": ["Montserrat-BlackItalic"],
        "montBold": ["Montserrat-Bold"],
        "montBoldItalic": ["Montserrat-BoldItalic"],
        "montExtraBold": ["Montserrat-ExtraBold"],
        "montExtraBoldItalic": ["Montserrat-ExtraBoldItalic"],
        "montExtraLight": ["Montserrat-ExtraLight"],
        "montExtraLightItalic": ["Montserrat-ExtraLightItalic"],
        "montItalic": ["Montserrat-Italic"],
        "montLight": ["Montserrat-Light"],
        "montLightItalic": ["Montserrat-LightItalic"],
        "montMedium": ["Montserrat-Medium"],
        "montMediumItalic": ["Montserrat-MediumItalic"],
        "montRegular": ["Montserrat-Regular"],
        "montSemiBold": ["Montserrat-SemiBold"],
        "montSemiBoldItalic": ["Montserrat-SemiBoldItalic"],
        "montThin": ["Montserrat-Thin"],
        "montThinItalic": ["Montserrat-Black"],
      }
    },
  },
  plugins: [],
}