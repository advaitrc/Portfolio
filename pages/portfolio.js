import Head from 'next/head';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <Head>
                <title>Your Website Title</title>
                <meta name="description" content="Your website description" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Navbar */}
            <nav className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-2xl font-bold">Navbar</div>
                    
                </div>
            </nav>

            {/* Image Carousel */}
            <div className="w-full bg-gray-300 h-64 flex items-center justify-center">
                <h2 className="text-3xl">Image Carousel</h2>
               
            </div>

            {/* Widgets */}
            <div className="container mx-auto flex justify-center my-8">
                <div className="bg-gray-200 p-4 m-2">
                    <h2 className="text-lg font-bold">Widget 1</h2>
                    <p>Sample text for Widget 1.</p>
                </div>
                <div className="bg-gray-200 p-4 m-2">
                    <h2 className="text-lg font-bold">Widget 2</h2>
                    <p>Sample text for Widget 2.</p>
                </div>
                <div className="bg-gray-200 p-4 m-2">
                    <h2 className="text-lg font-bold">Widget 3</h2>
                    <p>Sample text for Widget 3.</p>
                </div>
            </div>

            {/* Banner */}
            <div className="w-full bg-gray-400 h-32 flex items-center justify-center">
                <h2 className="text-2xl">Banner</h2>
                
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4">
                <div className="container mx-auto text-center">
                    Footer &copy; {new Date().getFullYear()}
                </div>
            </footer>
        </div>
    );
}
