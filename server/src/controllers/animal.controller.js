const convert = require('xml-js');
const axios = require('axios');


// 동물 정보 가져오기
const getAnimalData = async () => {
    const animalPath = 'http://openapi.seoul.go.kr:8088/564f6a4c5a64646f3832634b6d5357/xml/TbAdpWaitAnimalView/1/100/';
    const animalResponse = await axios.get(animalPath);
    const animalJsonData = convert.xml2json(animalResponse.data, { compact: true, spaces: 4 });
    const animals = JSON.parse(animalJsonData).TbAdpWaitAnimalView.row;

    // 동물 사진 정보 가져오기
    const photoPath = 'http://openapi.seoul.go.kr:8088/634165747763726933344154777a75/xml/TbAdpWaitAnimalPhotoView/1/1000/';
    const photoResponse = await axios.get(photoPath);
    const photoJsonData = convert.xml2json(photoResponse.data, { compact: true, spaces: 4 });
    const photos = JSON.parse(photoJsonData).TbAdpWaitAnimalPhotoView.row;

    // 동물과 사진 정보를 합쳐서 반환
    return animals.map(animal => {
        const animalNo = animal.ANIMAL_NO._text;
        const animalPhotos = photos.filter(photo => photo.ANIMAL_NO._text === animalNo);
        const photoUrls = animalPhotos.map(photo => photo.PHOTO_URL && photo.PHOTO_URL._text);

        return {
            ...animal,
            PHOTOS: photoUrls,
        };
    });
};

const AnimalInfo = async (req, res) => {
    try {
        const combinedData = await getAnimalData();
        res.json(combinedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// 특정 동물 번호에 해당하는 동물 상세 정보 반환
const getAnimalInfo = async (req, res) => {
    try {
        const combinedData = await getAnimalData();
        const aniNo = req.params.aniNo;
        
        const animalInfo = combinedData.find(animal => animal.ANIMAL_NO._text === aniNo);
        
        console.log(animalInfo.SPCS._text);

        if((animalInfo.SEXDSTN._text) == "W"){
            (animalInfo.SEXDSTN._text) = "암컷";
        }else{
            (animalInfo.SEXDSTN._text) = "수컷";
        }

        if (!animalInfo) {
            return res.status(404).json({ message: 'Animal not found' });
        }

        res.json(animalInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = { AnimalInfo, getAnimalInfo };
