 /* @ts-nocheck */
 import React from 'react';
 import './globals.css';
 
 export const metadata = {
   title: 'OpenSea.io',
   description: 'Migrated static site on Next.js',
 };
 
 export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
     <html lang="en">
       <body>{children}</body>
     </html>
   );
 }
