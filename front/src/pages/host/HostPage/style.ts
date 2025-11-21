import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Main = styled.main`
  min-height: 100vh;
  background-color: ${theme.colors.background};
`;

export const Content = styled.div`
  max-width: 40rem;
  margin: 0 auto;
  padding: 1.5rem 1.25rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const TokenSection = styled.section`
  background-color: ${theme.colors.surface};
  border-radius: ${theme.radius.xl};
  border: 1px solid ${theme.colors.border.light};
  box-shadow: ${theme.shadow.sm};
  padding: 1.5rem;
`;

export const SectionTitle = styled.h2`
  font-size: ${theme.fontSize.lg};
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

export const SectionDescription = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.secondary};
  margin-bottom: 1rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const CurrentToken = styled.p`
  margin-top: 0.75rem;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.muted};

  span {
    font-family: monospace;
    font-weight: 600;
    color: ${theme.colors.text.primary};
  }
`;

export const InfoText = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.muted};
  text-align: center;
  padding: 1rem 0;
`;

export const ErrorText = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.error};
  text-align: center;
  padding: 1rem 0;
`;

export const ReservationSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ReservationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ReservationCount = styled.span`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.muted};
`;

export const ReservationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ReservationCard = styled.article`
  background-color: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border.light};
  border-radius: ${theme.radius.lg};
  padding: 1rem;
  box-shadow: ${theme.shadow.sm};
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

export const GuestInfo = styled.div`
  font-weight: 600;
  color: ${theme.colors.text.primary};

  span {
    font-weight: 400;
    font-size: ${theme.fontSize.sm};
    color: ${theme.colors.text.muted};
  }
`;

export const CreatedAt = styled.div`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.text.muted};
`;

export const ContactInfo = styled.div`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.secondary};
  margin-bottom: 0.5rem;
`;

export const TimeInfo = styled.div`
  display: flex;
  gap: 1.5rem;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.primary};

  strong {
    color: ${theme.colors.text.muted};
    font-weight: 500;
  }
`;

export const Memo = styled.div`
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid ${theme.colors.border.light};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.secondary};
`;
