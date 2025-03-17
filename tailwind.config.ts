import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
           colors:{
            brand:{
                navy:'#1A2A3A',
                navyLight: '#2A3A4A',
                cream:'#F5F2EA',
                gold:'#C3A343',
                goldDark: '#839333',
                gray:'8C8C8C'
            }
           },
           fontFamily: {
            playfair:["Playfair Display","serif"],
            source:["Source Sans Pro","sans-serif"],
           }
        },
    },
    plugins: [],
}
export default config;