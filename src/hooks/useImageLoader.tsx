import { useEffect, useState } from 'react';

interface RequestData {
    url: string;
    headers?: any;
}

type Props = {
    request: RequestData;
};

const useImageLoader = ({ request }: Props) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchImages() {
        try {
            const response = await fetch(request.url, {
                headers: {
                    Authorization: import.meta.env.VITE_IMAGE_API_KEY,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Network error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            setImages(data.photos);
            setLoading(false);
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
        }
    }

    function getImagesByQuantity(x: number) {
        return images.slice(0, x);
    }

    useEffect(() => {
        fetchImages();
    }, []);

    return { images, loading, error, getImagesByQuantity: (x: number) => getImagesByQuantity(x) };
};

export default useImageLoader;
