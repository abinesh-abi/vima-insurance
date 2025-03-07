import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import './mantineLaout.css';


export default function MantineLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className=' bg-[#7a9bc9] h-dvh'>
            <MantineProvider defaultColorScheme="light" >{children}</MantineProvider>
        </div>
    );
}