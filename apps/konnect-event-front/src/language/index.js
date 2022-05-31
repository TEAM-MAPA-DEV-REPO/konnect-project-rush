import ko from './ko.json';
import en from './en.json';

const Init = (lang) => {
    if (lang == null) {
        return en
    } else if (lang == 'en') {
        return en
    } else if (lang == 'ko') {
        return ko
    }
}

export default Init