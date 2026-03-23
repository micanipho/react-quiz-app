import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ConfigProvider, Layout } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import { QuizProvider } from '@/context/QuizContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'React Quiz App',
  description: 'A front-end only multiple-choice quiz application built with Next.js, TypeScript, and Ant Design.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyleProvider hashPriority="high">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#1890ff',
                borderRadius: 4,
              },
              components: {
                Button: {
                  colorPrimary: '#1890ff',
                  algorithm: true,
                },
                Card: {
                  padding: 24,
                },
              },
            }}
          >
            <QuizProvider>
              <Layout style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f2f5' }}>
                <Layout.Content style={{ maxWidth: 600, width: '100%', padding: '20px' }}>
                  {children}
                </Layout.Content>
              </Layout>
            </QuizProvider>
          </ConfigProvider>
        </StyleProvider>
      </body>
    </html>
  );
}
