import React from 'react';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import { ExpandMore, Search } from '@mui/icons-material';

const faqData = [
  {
    question: 'How do I place an order?',
    answer: 'To place an order, browse our products, select the items you want, add them to your cart, and proceed to checkout. You can pay using various payment methods including credit cards and PayPal.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We accept returns within 30 days of delivery. Items must be in their original condition with all tags attached. Please contact our support team to initiate a return.'
  },
  {
    question: 'How is shipping calculated?',
    answer: 'Shipping costs are calculated based on your location and the weight of your order. Free shipping is available for orders over $100.'
  },
  {
    question: 'Are the products authentic?',
    answer: 'Yes, all our products are 100% authentic. We source our items directly from authorized retailers and verify their authenticity before listing.'
  },
  {
    question: 'How can I track my order?',
    answer: 'Once your order is shipped, you will receive a tracking number via email. You can use this number to track your package on our website or the courier\'s website.'
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to most countries worldwide. International shipping rates and delivery times may vary based on your location.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are processed securely.'
  },
  {
    question: 'How can I contact customer support?',
    answer: 'You can reach our customer support team through the Contact Support page, email us at support@thriftstore.com, or call us at 1-800-THRIFT.'
  }
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event) => {
    setExpanded(event.target.value === `panel${panel}`);
  };

  const filteredFAQs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Frequently Asked Questions
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
            }}
          />
        </Box>
      </Paper>

      {filteredFAQs.map((faq, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(index)}
          sx={{ mb: 2 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      {filteredFAQs.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No FAQs found matching your search.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setSearchQuery('')}
            sx={{ mt: 2 }}
          >
            Clear Search
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default FAQ; 