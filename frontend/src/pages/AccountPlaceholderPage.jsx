import React from 'react';
import PageContainer from '../components/PageContainer';

const AccountPlaceholderPage = ({ title }) => {
  return (
    <PageContainer className="max-w-[1248px]">
      <div className="bg-white shadow-sm p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
        <svg className="w-20 h-20 text-gray-200 mb-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.71C9.72 4.02 11.61 3 13.5 3c4.694 0 8.5 3.806 8.5 8.5s-3.806 8.5-8.5 8.5c-1.072 0-2.094-.2-3.04-.56m-3.12 1.41v-3.72M3 21l3-3m0 0l3 3m-3-3v3" />
        </svg>
        <h1 className="text-[24px] font-medium text-[#212121] mb-2">{title}</h1>
        <p className="text-[14px] text-[#878787] max-w-md">
          We are actively working on bringing the {title} feature to your account. Stay tuned for updates!
        </p>
      </div>
    </PageContainer>
  );
};

export default AccountPlaceholderPage;
