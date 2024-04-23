/* Components */
import { Providers } from "@/lib/providers";
import { Nav } from "./components/Nav";
import  Footer from "./components/Footer";

/* Instruments */
import styles from "./styles/layout.module.css";
import "./styles/globals.css";

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    
      <html lang="en">
        <body>
        <Providers>
          <div className={styles.layout}>
            <Nav />
            {props.children}
            <Footer/>
          </div>
          </Providers>
        </body>
      </html>
    
  );
}

