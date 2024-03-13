import { useEffect, useState } from 'react';

interface RequestData {
    url: string;
    options?: any;
}

type Props = {
    request: RequestData;
};

export const useFetchLoader = ({ request }: Props) => {
    const [images, setImages] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchImages = async (): Promise<void> => {
            setLoading(true);
            try {
                const response = await fetch(request.url, request.options && request.options);
                if (!response.ok) throw new Error(`Network error: ${response.status} - ${response.statusText}`);

                const data = await response.json();
                setImages(data.photos);
                setLoading(false);
            } catch (error: { message: string } | any) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchImages();
    }, [request.url]);

    return { images, loading, error };
};
