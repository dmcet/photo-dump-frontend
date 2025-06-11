import useSWR from "swr";

interface ImageDto {
    id: number | null;
    name: string;
    url: string;
}

export default function ViewImagesPage() {
    const {data, error, isLoading} = useSWR<ImageDto[]>(
        'http://localhost:8080/api/v1/images',
        async (url: RequestInfo | URL) => {
            const response = await fetch(url);
            return response.json();
        }
    )

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="container text-center">
            <div className="row row-cols-md-3">
                {data?.map((image) => (
                    <img
                        key={image.id}
                        src={"http://localhost:8080" + image.url}
                        alt={image.name}
                        className="img-fluid"
                    />
                ))}
            </div>
        </div>
    );

}