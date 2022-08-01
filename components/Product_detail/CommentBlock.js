import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import {getCommentById} from '/public/store/ProductState'
import * as React from 'react'


export default function CommentBlock({comment_id}) {
  return (
        {
       
          comment_id.map((cmt, index) =>(

            <Card variant="outlined" sx={{ minWidth: 320 }} key={index}>
              
              <Typography level="h2" sx={{ fontSize: 'md', mt: 2 }}>
                User
              </Typography>
              <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
                Comment content
              </Typography>
              <CardOverflow
                variant="soft"
                sx={{
                  display: 'flex',
                  gap: 1.5,
                  py: 1.5,
                  px: 'var(--Card-padding)',
                  borderTop: '1px solid',
                  borderColor: 'neutral.outlinedBorder',
                  bgcolor: 'background.level1',
                }}
              >
                <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                  {cmt}
                </Typography>
                <Box sx={{ width: 2, bgcolor: 'divider' }} />
                <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                  Time
                </Typography>
              </CardOverflow>
            </Card>
          )
        )
      }
  )
}
