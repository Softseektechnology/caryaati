import '../app/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Poppins } from "next/font/google";


// import AuthProvider from './AuthProvider';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: 'Car Rental App',
  description: 'Car rental services in UAE',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital@0;1&family=Roboto:ital,wdth,wght@0,75..100,100..900;1,75..100,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={poppins.className}>
        {/* <AuthProvider> */}
        {children}
        {/* </AuthProvider> */}
        </body>
    </html>
  );
}