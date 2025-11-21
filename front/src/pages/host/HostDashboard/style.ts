import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.background};
`;

export const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.p`
  color: ${theme.colors.text.muted};
`;

export const MainContent = styled.main`
  max-width: 430px;
  margin: 0 auto;
  padding: 1.5rem;
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const Welcome = styled.h1`
  font-size: ${theme.fontSize.lg};
  font-weight: 600;
  color: ${theme.colors.text.primary};
`;

export const LogoutButton = styled.button`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.secondary};
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.text.primary};
  }
`;

export const Section = styled.section`
  margin-bottom: 2rem;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const SectionTitle = styled.h2`
  font-size: ${theme.fontSize.md};
  font-weight: 600;
  color: ${theme.colors.text.primary};
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${theme.colors.text.muted};
  font-size: ${theme.fontSize.sm};
  background: ${theme.colors.surface};
  border-radius: ${theme.radius.md};
  border: 1px solid ${theme.colors.border.default};
`;

export const SpotList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SpotCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border.default};
  border-radius: ${theme.radius.md};
`;

export const SpotInfo = styled.div`
  flex: 1;
`;

export const SpotName = styled.p`
  font-size: ${theme.fontSize.md};
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 0.25rem;
`;

export const SpotAddress = styled.p`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.text.secondary};
`;

export const QRButton = styled.button`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.primary};
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.primary};
  border-radius: ${theme.radius.sm};
  padding: 0.5rem 0.75rem;
  cursor: pointer;

  &:hover {
    background: ${theme.colors.primary};
    color: white;
  }
`;

export const ReservationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ReservationInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const GuestName = styled.p`
  font-size: ${theme.fontSize.md};
  font-weight: 600;
  color: ${theme.colors.text.primary};
`;

export const ReservationDetails = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.secondary};
`;

export const ReservationStatus = styled.span<{ status: string }>`
  font-size: ${theme.fontSize.xs};
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: ${theme.radius.sm};
  width: fit-content;

  ${({ status }) => {
    switch (status) {
      case 'paid':
        return `
          background: #dcfce7;
          color: #166534;
        `;
      case 'completed':
        return `
          background: #e0e7ff;
          color: #3730a3;
        `;
      case 'cancelled':
        return `
          background: #fee2e2;
          color: #991b1b;
        `;
      default:
        return `
          background: #fef3c7;
          color: #92400e;
        `;
    }
  }}
`;
