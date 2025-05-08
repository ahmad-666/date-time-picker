import Button from '.';
import Icon from '../Icon';

export default function ButtonExample() {
    return (
        <div className='flex flex-col flex-wrap gap-5'>
            <div>
                <h1>#1: Filled:</h1>
                <Button type='button' variant='filled' size='md' color='primary' hover press onClick={() => {}}>
                    Click Me
                </Button>
            </div>
            <div>
                <h1>#2: Filled with loading,disabled:</h1>
                <Button variant='filled' size='lg' disabled loading>
                    Click Me
                </Button>
            </div>
            <div>
                <h1>#3: Outlined + link:</h1>
                <Button
                    variant='outlined'
                    size='lg'
                    color='secondary-lighten-2'
                    link
                    href={{ pathname: '/auth', query: { key: 'val' } }}
                    target='_blank'
                    ariaLabel='search'
                    rel='noreferrer nofollow noopener'
                >
                    Click Me
                </Button>
            </div>
            <div>
                <h1>#4: Text:</h1>
                <Button variant='text' color='primary'>
                    Select Plan
                </Button>
            </div>
            <div>
                <h1>#5: Btn With Icon:</h1>
                <Button
                    variant='outlined'
                    size='sm'
                    color={true ? 'neutral' : 'white'}
                    contentClassName='w-full h-full'
                >
                    <Icon icon='mdi:close' size='md' color='inherit' />
                </Button>
            </div>
            <div>
                <h1>#6: Manually override coloring/sizing for special cases:</h1>
                <Button
                    variant='outlined'
                    color='slate-500'
                    className='w-full !px-10 !py-4 !text-body-lg hover:!bg-red-700 hover:!text-red-200'
                >
                    Select Plan
                </Button>
                <Button
                    variant='text'
                    color='slate-400'
                    hover
                    press={false}
                    className='!p-1.5 hover:!bg-slate-400/30' //simply use opacity version of main color
                >
                    <Icon icon='mdi:close' size='md' color='inherit' />
                </Button>
                <Button variant='text' hover={false} press={false} className='!p-0'>
                    <Icon icon='mdi:close' size='md' color='inherit' />
                </Button>
            </div>
        </div>
    );
}
