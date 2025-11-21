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

export const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
`;

export const ErrorMessage = styled.p`
  color: ${theme.colors.text.error};
`;

export const MainContent = styled.main`
  max-width: 430px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  text-align: center;
`;

export const SuccessIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

export const Title = styled.h1`
  font-size: ${theme.fontSize["2xl"]};
  font-weight: 700;
  color: ${theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.secondary};
  margin-bottom: 2rem;
`;

export const ReservationCard = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border.default};
  border-radius: ${theme.radius.lg};
  padding: 1.25rem;
  text-align: left;
  margin-bottom: 1.5rem;
`;

export const CardTitle = styled.h2`
  font-size: ${theme.fontSize.md};
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 1rem;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.5rem 0;
`;

export const InfoLabel = styled.span`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.secondary};
  flex-shrink: 0;
`;

export const InfoValue = styled.span`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.primary};
  text-align: right;
  margin-left: 1rem;
`;

export const PriceValue = styled.span`
  font-size: ${theme.fontSize.lg};
  font-weight: 700;
  color: ${theme.colors.primary};
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${theme.colors.border.light};
  margin: 0.75rem 0;
`;

export const MapSection = styled.div`
  margin-bottom: 1.5rem;
`;

export const MapPlaceholder = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border.default};
  border-radius: ${theme.radius.lg};
  padding: 2rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const MapIcon = styled.span`
  font-size: 2rem;
`;

export const MapText = styled.span`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.secondary};
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;
