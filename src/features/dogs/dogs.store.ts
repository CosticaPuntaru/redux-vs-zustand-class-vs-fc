// api :  https://dog.ceo/api/breeds/list/all

interface DogBreed {
    [key: string]: string[];
}

export interface DogBreedList {
    message: DogBreed,
    status: string,
}


// api: https://dog.ceo/api/breed/hound/images/random/3
export interface DogImagesList {
    message: string[],
    status: string,
}



