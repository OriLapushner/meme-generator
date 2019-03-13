import webFont from 'webfontloader'

const fontList = [
    'Arial',
    'Droid Serif',
    'Dancing Script',
    'Ubuntu',
    'Noto Sans',
    'PT Sans',
    'Overpass',
    'Merriweather',
    'Mukta',
    'Raleway',
    'Oswald',
    'Montserrat',
    'Rubik',
    'Lato',
    'Open Sans',
    'Srisakdi',
    'Arimo',
    'Roboto'
]
webFont.load({
    google: {
        families: fontList
    }
});

export default fontList