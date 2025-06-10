import {useState} from "react";

const Page = {
    Home: 'Home',
    UploadImage: 'Upload Image',
    ViewImages: 'View Images'
} as const;

type Page = typeof Page[keyof typeof Page];


export default function App() {
    const [currentPage, setCurrentPage] = useState<Page>(Page.Home)

    return (
        <>
            <h1 className="m-3">Hello, world!</h1>

            <nav className="nav nav-pills nav-fill">
                {Object.values(Page).map(page => (
                    <a
                        key={page}
                        className={"nav-link " + (currentPage === page ? "active" : "")}
                        aria-current="page"
                        onClick={() => setCurrentPage(page)}
                        href="#">{page}
                    </a>
                ))}
            </nav>
        </>
    )
}