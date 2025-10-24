import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


const data = [
    {
        title: "Westside",
        phone: "45861254776",
        mail: "blabla24@gmail.com",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Westside_Market_in_Manhattan%2C_NYC_IMG_5615.JPG/640px-Westside_Market_in_Manhattan%2C_NYC_IMG_5615.JPG",
        logo: "",
    },
    {
        title: "Ranjeet",
        phone: "45861254776",
        mail: "blabla24@gmail.com",
        src: "https://c8.alamy.com/comp/T0CKE4/indian-peering-out-from-counter-at-general-store-bundi-rajasthan-india-T0CKE4.jpg",
        logo: "",
    },
    {
        title: "Westside",
        phone: "45861254776",
        mail: "blabla24@gmail.com",
        src: "https://media.gettyimages.com/id/1342439533/photo/happy-woman-working-at-a-local-food-market-and-standing-at-the-door-waiting-for-clients.jpg?s=612x612&w=0&k=20&c=66sR9RcM2WUlq70J3QO3-qWidJ-hizBbkr1CY4ydW4k=",
        logo: "",
    },
    {
        title: "Westside",
        phone: "45861254776",
        mail: "blabla24@gmail.com",
        src: "https://media.istockphoto.com/id/589573602/photo/grocery-store.jpg?s=612x612&w=0&k=20&c=2byVHu-vt03VKui9QZTC2Vj3iO1i-b2l-X_7XDFojpw=",
        logo: "",
    },
    {
        title: "Westside",
        phone: "45861254776",
        mail: "blabla24@gmail.com",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Westside_Market_in_Manhattan%2C_NYC_IMG_5615.JPG/640px-Westside_Market_in_Manhattan%2C_NYC_IMG_5615.JPG",
        logo: "",
    },
    {
        title: "Westside",
        phone: "45861254776",
        mail: "blabla24@gmail.com",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Westside_Market_in_Manhattan%2C_NYC_IMG_5615.JPG/640px-Westside_Market_in_Manhattan%2C_NYC_IMG_5615.JPG",
        logo: "",
    },
    {
        title: "Westside",
        phone: "45861254776",
        mail: "blabla24@gmail.com",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Westside_Market_in_Manhattan%2C_NYC_IMG_5615.JPG/640px-Westside_Market_in_Manhattan%2C_NYC_IMG_5615.JPG",
        logo: "",
    },
    {
        title: "Westside",
        phone: "45861254776",
        mail: "blabla24@gmail.com",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Westside_Market_in_Manhattan%2C_NYC_IMG_5615.JPG/640px-Westside_Market_in_Manhattan%2C_NYC_IMG_5615.JPG",
        logo: "",
    },
    {
        title: "Westside",
        phone: "45861254776",
        mail: "blabla24@gmail.com",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Westside_Market_in_Manhattan%2C_NYC_IMG_5615.JPG/640px-Westside_Market_in_Manhattan%2C_NYC_IMG_5615.JPG",
        logo: "",
    },
    {
        title: "Westside",
        phone: "45861254776",
        mail: "blabla24@gmail.com",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Westside_Market_in_Manhattan%2C_NYC_IMG_5615.JPG/640px-Westside_Market_in_Manhattan%2C_NYC_IMG_5615.JPG",
        logo: "",
    },
    {
        title: "Westside",
        phone: "45861254776",
        mail: "blabla24@gmail.com",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Westside_Market_in_Manhattan%2C_NYC_IMG_5615.JPG/640px-Westside_Market_in_Manhattan%2C_NYC_IMG_5615.JPG",
        logo: "",
    },
    {
        title: "Westside",
        phone: "45861254776",
        mail: "blabla24@gmail.com",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Westside_Market_in_Manhattan%2C_NYC_IMG_5615.JPG/640px-Westside_Market_in_Manhattan%2C_NYC_IMG_5615.JPG",
        logo: "",
    },

];

const ITEMS_PER_PAGE = 8;


const Vendor = () => {

    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the total pages
    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

    // Get the current page's data
    const currentPageData = data.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div>
            <div className="container mx-auto py-6 lg:py-10 px-2 xl:px-0">
                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                    {currentPageData.map(({ title, phone, mail, src, logo }, index) => (
                        <Card
                            key={index}
                            className="h-64 rounded-lg shadow-lg overflow-hidden relative"
                            style={{
                                backgroundImage: `url(${src})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <CardContent className="p-0 h-full flex flex-col justify-end relative">
                                {/* Info Section */}
                                <div className="bg-black/50 text-white p-4 flex-grow">
                                    <h3 className="text-lg font-bold">{title}</h3>
                                    <p>{phone}</p>
                                    <p>{mail}</p>
                                </div>

                                {/* Button Section */}
                                <div className="bg-white flex justify-between p-2 relative z-0">
                                    <button className="px-5 py-2 text-xs bg-idl-green rounded-full text-white shadow-md">
                                        Visit Store
                                    </button>
                                    {/* Avatar */}
                                    <div className="z-10 absolute bottom-8 right-2">
                                        <Avatar className="bg-white p-1 border-2 border-gray-300 shadow-lg">
                                            <AvatarImage
                                                src="https://github.com/shadcn.png"
                                                className="rounded-full"
                                            />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-center">
                    <Pagination>
                        <PaginationPrevious
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </PaginationPrevious>
                        <PaginationContent>
                            {[...Array(totalPages)].map((_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        active={index + 1 === currentPage}
                                        onClick={() => setCurrentPage(index + 1)}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                        </PaginationContent>
                        <PaginationNext
                            onClick={() =>
                                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                            }
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </PaginationNext>
                    </Pagination>
                </div>
            </div>
        </div>
    )
}

export default Vendor