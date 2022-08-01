import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import {getCommentById} from '/public/store/ProductState'


export default function CommentBlock({comment_id}) {
    return (
      {
        comment_id.map((cmt, index) => 
        
          <Card variant="outlined" sx={{ minWidth: 320 }} key={index}>
            {/* <CardOverflow>
              <AspectRatio ratio="2">
                <img
                  src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?crop=entropy&auto=format&fit=crop&w=3270"
                  alt=""
                />
              </AspectRatio>
            </CardOverflow> */}
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
              {
                getCommentById([cmt]).then(res => res)
              }
              </Typography>
              <Box sx={{ width: 2, bgcolor: 'divider' }} />
              <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                Time
              </Typography>
            </CardOverflow>
          </Card>
        )
      }
    );
}
