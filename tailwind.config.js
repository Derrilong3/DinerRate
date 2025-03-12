/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                brighGray: '#EEEEEE',
                cyan: '#00ADB5',
                lightBlue: {
                    200: '#E3FDFD',
                    300: '#CBF1F5',
                    400: '#A6E3E9',
                    500: '#71C9CE',
                },
                dark: {
                    500: '#393E46',
                    600: '#222831',
                },
                eerieBlack: '#181818',
            },
        },
    },
    plugins: [],
};
